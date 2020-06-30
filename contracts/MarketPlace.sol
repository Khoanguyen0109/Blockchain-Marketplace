pragma solidity ^0.5.0;

contract Marketplace {
            string public name;

    constructor() public {
        name = "Marketplace";
    }

    //Product
    uint[] public  idpackages ;
    enum productStatus { atcreator, picked, delivered}
    uint public productCount = 0;
    struct Product{
        uint num;
        uint productID;
        string productName;
        // int totalQuantity;
        // int pickedQuantity;
        // int deliveredQuantity;
        string manufactor;
        string shipper;
        string retailer;
        productStatus status;
    }
    mapping(uint => Product) public products;

    // User
    address[] users;
    enum roles {norole, Manufactor, Shipper, Retailer}
    struct User {
        address userAddress;    
        string userName;
        roles role;

    }
    mapping( address => User) public  UserInfo;

    // Event 
    event ProdcutCreated(
        uint indexed productID,
        string productName,
        string manu,
        productStatus status
    );
    event UpdateProductState(
        uint indexed productID,
        string owner,
        productStatus status
    );
        event UserRegistered (
        address userAddress,
        string userName,
        uint userRole
    );


    // -----------------------------
    //User
    function registerUser  (
        address _userAddress,
        string memory _userName,
        uint _role
    )   public    {
        require(checkUserExist(_userAddress) == false, 'user had registed');
        require(_userAddress == msg.sender 
                , 'you can not use aother one account to register');
        UserInfo[_userAddress].userAddress = msg.sender  ;
        UserInfo[_userAddress].userName = _userName;
        UserInfo[_userAddress].role = roles(_role);
        users.push(_userAddress);

        emit UserRegistered(_userAddress, _userName,_role);

    }

    function checkUserExist (
       address _address    
    )   public returns (bool)
    {
        for (uint i =0; i < users.length;i++){
            if (users[i] == _address){
                return true;
            }
        }
        return false;

    }

    //----------------------------------------------
    // Product Function
    function createProduct (  uint _proID ,string memory  _productName  )public {
        require(_proID> 0, 'id much be > 0');
        require(bytes(_productName).length > 0);
        require( checkProductExits(_proID)== false,'product have exist');
        require(UserInfo[msg.sender].role == roles.Manufactor ,'user much be manufactor');
        productCount++;
         products[productCount] = Product(productCount,_proID,_productName,UserInfo[msg.sender].userName, 
                                '', '',productStatus.atcreator);
                                
        idpackages.push(_proID);
        // return (products[productCount].productID ,products[productCount].productName);
        emit ProdcutCreated(_proID , _productName, UserInfo[msg.sender].userName, productStatus.atcreator);
    }

    function shipProduct( uint _proID) public {
        require( checkProductExits(_proID)== true,'product have not exist');
        require(UserInfo[msg.sender].role == roles(2) 
                            ,'user much be shipper');
         require(_proID> 0, 'id much be > 0');
        

        for(uint i =1;i <=productCount; i++){
            if (products[productCount].productID == _proID && products[productCount].status == productStatus.atcreator){
                products[productCount].shipper = UserInfo[msg.sender].userName;
                products[productCount].status = productStatus.picked;
            }
        }
        emit UpdateProductState(_proID,UserInfo[msg.sender].userName ,products[productCount].status);
    }

    function receiveProduct( uint _proID ) public {
        
       
        require(UserInfo[msg.sender].role == roles(3) 
                                ,'user much be retailer');

        for(uint i =1;i <=productCount; i++){
            if (products[productCount].productID == _proID && products[productCount].status == productStatus.picked){
            products[productCount].retailer = UserInfo[msg.sender].userName;
            products[productCount].status = productStatus.delivered;
            }
        }
        emit UpdateProductState(_proID,UserInfo[msg.sender].userName ,products[productCount].status);
    }
    
     function checkProductExits (uint  id)public returns (bool) {
         for (uint i =0; i < idpackages.length;i++){
            if (idpackages[i] == id){
                return true;
            }
        }
        return false;


    }    
}