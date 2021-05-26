const Crud = artifacts.require('Crud');

contract('Crud', ()=>{
    let crud = null;

    before(async ()=>{
        crud = await Crud.deployed();
    });

    it('Should create a new User', async()=>{
        await crud.createUser('Bob');
        const user = await crud.readUser(1);
        assert(user[0].toNumber() == 1);
        assert(user[1] == 'Bob');
    });

    it('Should update user details', async ()=>{
        await crud.updateUser(1, "Mary");
        const user = await crud.readUser(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Mary');
    });

    it('Should not update a non-existing user', async ()=>{
        try{
            await crud.updateUser(2, "Alice");
        }catch(e){
            assert(e.message.includes("User doesn't exist"));
            return;
        }
        assert(false);
    });

    it('Should delete an exisiting user', async()=>{
        await crud.deleteUser(1);
        try{
            const user = await crud.readUser(1);
        }catch(e){
            assert(e.message.includes("User doesn't exist"));
            return;
        }
        assert(false);
    });

    it('Should not delete a non exisiting user', async()=>{
        try{
            await crud.deleteUser(10);
        }catch(e){
            assert(e.message.includes("User doesn't exist"));
            return;
        }
        assert(false);
    });

});