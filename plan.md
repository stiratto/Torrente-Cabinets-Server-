# PLAN ABOUT ROUTES

1 route for ADMIN actions
admin/
    product/
        createProduct/ 
        deleteProduct/
    dealer/
        dealerRequests/
        acceptRequest/:id
        denieRequest/:id
    user/
       getAdmins/ 
       getRegisteredUsers/
       filterUsersByRole/:role
       pagination/
        getSpecificId/:id

product/       
    getProducts/
    getCartProducts/
    getProductDetails/:id
    

auth/
    login/
    register/

