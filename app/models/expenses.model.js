module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         description: { type: String, default: 'halllooooo' },
         casherName: { type: String, default: 'khleed' },
         value: { type: Number, default: 5 },
         time: { type: String, required: true },
         created_on: { type: String, required: true },
         published: { type: Boolean, default: true },
      },
      { timestamps: true }
   );

   schema.method('toJSON', function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   const Items = mongoose.model('Reportexpenses', schema);
   return Items;
};
