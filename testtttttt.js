const db = require('../../../db')
const clsRunning = require('./running')


const postGenerateSaleHandler = async (ctx) => {
    
    let saleBody = ctx.request.body
    saleBody.ListSale.forEach(async (hd) =>  {        
        let sql    
        sql = await genHeader(hd)    
        sql = 'begin ' + sql +' end; '

        let returnResult = {}

       try{
            let resultrows = await db.query(null)
            console.log(resultrows)
            returnResult.error_desc = ``
            returnResult.error_flg = false         
       }catch (err) {
        console.log('postGenerateSaleHandler ' + err + sql)  
        returnResult.error_desc = err  + sql
        returnResult.error_flg = true                   
       }finally{
            ctx.body = returnResult
       }
    });
}



const findRef = async (orgCode) => {
    let sql =`
        select REF_CUSTOMER_CODE
        FROM MAS_ORG
        WHERE
        ORG_CODE='${orgCode}'
    `
    let resultrows = await db.query(sql)
    return resultrows[0].REF_CUSTOMER_CODE    
}
const findDueDate = async (orgCode,cvCode,documentDate) => {
    let sql =`
    select  M.DUE_DAY as dueDay, to_char(to_date('${documentDate}','dd/MM/yyyy') + M.DUE_DAY,'dd/MM/yyyy')  as dueDate
    FROM MAS_CUSTOMER_SALES CS ,MAS_PAYMENT_TERM M
    WHERE
    CS.CUSTOMER_CODE='${cvCode}'
    AND CS.SALE_ORG='${orgCode}'
    AND CS.PAYMENT_TERMS = M.PAYMENT_TERM
    `
    let resultrows = await db.query(sql)
    
    return resultrows[0]   
}



const genHeader = async (header) => {
    let dueDate = await findDueDate(header.OrgCode,header.cvCode,header.DocumentDate)
    let sql 

    sql = ` 
    DELETE  FR_TRN_SALE_HEADER   WHERE ORG_CODE = '${header.OrgCode}' AND DOCUMENT_TYPE='${header.DocumentType}' AND DOCUMENT_NO ='${header.DocumentNo}';
    DELETE  FR_TRN_SALE_DETAIL   WHERE ORG_CODE = '${header.OrgCode}' AND DOCUMENT_TYPE='${header.DocumentType}' AND DOCUMENT_NO ='${header.DocumentNo}';
    
    `
    //console.log(dueDate)
     sql += `
                Insert into FR_TRN_SALE_HEADER
            (ORG_CODE, DOCUMENT_TYPE, DOCUMENT_NO, 
            DOCUMENT_DATE, REF_DOCUMENT_DATE, REF_DOCUMENT_SO_TYPE, 
            REF_DOCUMENT_SO_NO, CV_CODE, CREDIT_TERM, DUE_DATE, 
            TEXT_CODE, LICENSE_NO, WAREHOUSE, 
            DISC_PER1, DISC_PER2, DISC_PER3, 
            GROSS_AMT, DISC_AMT, DISC_AMT1, 
            DISC_AMT2, DISC_AMT3, FREIGHT_AMT, 
            VAT_AMT, NET_AMT, DOCUMENT_STATUS, 
            SALEMAN_CODE, CANCEL_FLAG, USER_CREATE, 
            CREATE_DATE,  STOCK_TYPE,
                REF_VENDOR, ACC_CONFIRM, SEND_TO_NAME, 
                FLAG_SAP, PRINT_NO, HATCHERY_CONDITION, 
                PROGRAM_ID, SHIPTO) Values
        ('${header.OrgCode}' , '${header.DocumentType}', '${header.DocumentNo}', 
        to_date('${header.DocumentDate}','dd/MM/yyyy'), to_date('${header.RefDocumentDate}','dd/MM/yyyy'), '${header.RefDocumentSoType}', 
        '${header.RefDocumentSoNo}', '${header.cvCode}', '${dueDate.DUEDAY}', to_date('${dueDate.DUEDATE}','dd/MM/yyyy'), 
            '00', '${header.LicenseNo}', '${header.OrgCode}', 
            '0', '0', '0', 
            '${header.GrossAmt}', '${header.DiscAmt}', '0', 
            '0', '0', '${header.FreightAmt}', 
            '${header.VatAmt}', '${header.NetAmt}', 'Y', 
            '${header.SalemanCode}', 'N', '${header.UserCreate}', 
            to_date('${header.DocumentDate}','dd/MM/yyyy  HH24:MI:SS'),  '${header.StockType}',
                '${ await findRef(header.OrgCode) }', 'N', '', 
                'N', '1', 'N', 
                'AUTO_API', '') ;           
                `
        header.Detail.forEach( (de) => 
            sql += `
            Insert into FR_TRN_SALE_DETAIL
                (ORG_CODE, DOCUMENT_TYPE, DOCUMENT_NO ,
                DOCUMENT_EXT, FARM_ORG, ENTRY_CODE, 
                PRODUCT_CODE, GRADE_CODE, SALE_QTY, 
                SALE_FEMALE, SALE_MALE, SALE_WGH, 
                UNIT, UNIT_DISC, SALE_AMT, 
                DISC_PER, DISC_PER1, DISC_PER2, 
                DISC_PER3, DISC_AMT, DISC_AMT1, 
                DISC_AMT2, DISC_AMT3, FREIGHT_AMT, 
                VAT_AMT, NET_AMT, CANCEL_FLAG, 
                USER_CREATE, CREATE_DATE, EGG_AGE, 
                SALE_FEMALE1, SALE_MALE1, SALE_WGH1, 
                TAX_AMT,FARMER_ORG,REF_ORG_CODE)
            Values
                ('${header.OrgCode}' , '${header.DocumentType}', '${header.DocumentNo}',  
                '${de.Ext}', '${header.OrgCode}-0000-0000', '${de.EntryCode}', 
                '${de.ProductCode}', '${de.GradeCode}', '${de.SaleQty}', 
                '${de.SaleFemale}', '${de.SaleMale}', '${de.SaleWgh}', 
                '${de.UnitPrice}', '${de.UnitDisc}', '${de.SaleAmt}', 
                '0', '0', '0', 
                '0', '${de.DiscAmt}', '0', 
                '0', '0', '${de.FreightAmt}', 
                '${de.VatAmt}', '${de.NetAmt}', 'N', 
                '${header.UserCreate}', to_date('${header.DocumentDate}','dd/MM/yyyy  HH24:MI:SS'), 0, 
                0, 0, 0, 
                0,'${de.FarmOrg}','${de.RefOrgCode}') ;   
            `        
        )

        sql += ` FR_SP_SALES_STOCK_FROM_MENDIX ('${header.OrgCode}' , '${header.DocumentType}', '${header.DocumentNo}');  `
        return sql    
}



module.exports = {
    postGenerateSaleHandler    
}
