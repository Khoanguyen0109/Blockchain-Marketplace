const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace

  before(async () => {
    marketplace = await Marketplace.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await marketplace.name()
      assert.equal(name, 'Marketplace')
    })

  })

  describe('products', async () => {
    let result, productCount,register

    before(async () => {
      console.log('seller', seller)
      register = await marketplace.registerUser(seller, 'manu', 1,{ from: seller } )
      result = await marketplace.createProduct(123,'iPhone X', { from: seller })
      productCount = await marketplace.productCount()
    })
    it('register manu', async()=>{
      //SUCCESS
      const event = register.logs[0].args
      assert.equal(event.userAddress,seller,'address is correct')
      assert.equal(event.userName, 'manu','name is manu')
      assert.equal(event.userRole,1,'role is manu')
      
    } )
    it('creates products', async () => {
      // SUCCESS
      assert.equal(productCount, 1)
      const event = result.logs[0].args
      assert.equal(event.productID.toNumber(), 123, 'id is correct')
      assert.equal(event.productName, 'iPhone X', 'name is correct')
      // console.log('event.status', event.status.toNumber())
      assert.equal(event.status.toNumber(), 0,'product at creator')
      assert.equal(event.manu, 'manu', 'owner is correct')
      

      // FAILURE: Product must have a name
      // await await marketplace.createProduct('','', { from: seller }).should.be.rejected;
      // FAILURE: Product must have a price
      // await await marketplace.createProduct('','iPhone X', { from: seller }).should.be.rejected;
    })
  })
})