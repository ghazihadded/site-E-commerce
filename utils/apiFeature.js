class ApiFeatures{
    constructor(query,queryStr){

        this.query=query,
        this.queryStr=queryStr
    }

    search(){
       const keyword= this.queryStr.keyword ? {
          name:{
              $regex:this.queryStr.keyword,
              $options:'i'
          } 

       }:{}
      
       this.query=this.query.find({...keyword})
       return this 
    }

    filter(){
        const queryCopy={...this.queryStr}
        console.log(queryCopy)
        const removeField= ['keyword','limit','page']
        removeField.forEach(el=> delete queryCopy[el])
        console.log(queryCopy)
        this.query=this.query.find({queryCopy})
        return this

    }
}


module.exports=ApiFeatures