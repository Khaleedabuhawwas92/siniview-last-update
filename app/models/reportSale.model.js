const { Date } = require('mongoose');
module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         allIetms: { type: Array, required: true, timestamps: true,default:["khaled","ahmad","abdallah"] },
         
         discraption: String,
         additions: Array,
         sumation: { type: Number, required: true, default: 25 },
         casherName: { type: String, required: true, default: 'khaled' },
         price: { type: Number, required: true, default: 22 },
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
