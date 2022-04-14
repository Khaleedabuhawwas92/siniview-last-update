module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         allIetms: { type: Array, required: true,default:["khaleed","ahmad","abuhawwas"] },
         discraption: { type: Number, required: true,default:25 },
         additions: { type: Array, required: true,default:"null" },
         sumation: { type: Number, required: true,default:25 },
         recpieNumber: { type: Number, required: true,default:0},
         tax: { type: Number, required: true,default:1},
         totalAccount:{ type: Number, required: true,default:1},
         casherName: { type: String, required: true,default:"khaled" },
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
