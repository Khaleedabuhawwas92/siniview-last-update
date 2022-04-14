module.exports = (mongoose) => {
    var schema = mongoose.Schema({
       description: { type: String, default: 'halllooooo' },
       casherName: { type: String, default: 'khleed' },
       value: { type: Number, default: 5 },
       wheigt: { type: Number, default: 5 },
       published: { type: Boolean, default: true },
       
    },
    { timestamps: true }
    );
 
    schema.method('toJSON', function () {
       const { __v, _id, ...object } = this.toObject();
       object.id = _id;
       return object;
    });

    const Items = mongoose.model('Reportpurchase', schema);
    return Items;
 };
 