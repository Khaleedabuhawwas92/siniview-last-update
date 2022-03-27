module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         tab: { type: String, required: true },
         product: [
            {
               allIetms: { type: Array, required: true },
               image: String,
               discraption: String,
               additions: Array,
               sumation: { type: Number, required: true },
               casherName: { type: String, required: true },
               price: { type: String, required: true },
            },
         ],

         published: Boolean,
      },
      { timestamps: true }
   );

   schema.method('toJSON', function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   const ReportItems = mongoose.model('reportItems', schema);
   return ReportItems;
};
