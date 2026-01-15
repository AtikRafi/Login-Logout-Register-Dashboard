export const claimReq ={
    adminOnly : (c:any)=>c.role =="Admin",
    storeOwner : (c:any)=>c.role =="Admin" || c.role=="VendorOwner" ,
    customer : (c:any)=> c.role == "Admin" || c.role=="VendorOwner" || c.role=="customer"
}