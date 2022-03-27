
module.exports = (mongoose) => {
   var Float = require('mongoose-float').loadType(mongoose);
   var schema = mongoose.Schema({
      tab: String,
      description: String,
      published: Boolean,
      product: [
         {
            title: String,
            price: String,
            image: String,
            discraption: String,
            additions:Array

         },
      ],
   });

   schema.method('toJSON', function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   const Items = mongoose.model('item', schema);
   return Items;
};
