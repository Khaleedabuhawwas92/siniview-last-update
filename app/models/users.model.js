const jwt = require("jsonwebtoken");
module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         name: { type: String, required: true },
         email: { type: String, required: true },
         age: { type: Number, required: true },
         password: { type: String, required: true },
         auth: { type: String },
         published: Boolean,
         isAdmain: Boolean,
         roles:[{
            insert:Boolean,
            delete:Boolean,
            read:Boolean,
            write:Boolean

         }]
      },
      { timestamps: true }
   );

   schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   schema.method("token", function () {
      const token = jwt.sign(
         { _id: this._id, isAdmain: this.isAdmain },
         "privet"
      );
      return token;
   });

   const Users = mongoose.model("users", schema);
   return Users;
};
