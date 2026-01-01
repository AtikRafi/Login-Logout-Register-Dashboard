export const claimReq ={
    adminOnly : (c:any)=>c.role =="Admin",
    storeOwner : (c:any)=>c.role =="Admin" || c.role=="StoreOwner" ,
    customer : (c:any)=> c.role == "Admin" || c.role=="StoreOwner" || c.role=="customer"
}