//set up a mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/synth';
mongoose.connect(mongoDB);

const settingsSchema = new mongoose.Schema({
  detune: Number,
  gain: Number,
  type: String,
  volume: Number,
  portamento: Number,
  release: Number,
  attack: Number,
  sustain: Number,
  decay: Number,
  user: String,
  presetName: String
});

const Preset = mongoose.model('Preset', settingsSchema);

//findone and update based on user and presetName with upsert if not found using promises
module.exports.post = (user, presetName, settings) => {
  return Preset.findOneAndUpdate({user: user, presetName: presetName}, settings, {upsert: true, new: true});
}
//retrieve all presets from mongoose
module.exports.get = () => {
  return Preset.find({}).exec();
}
//delete preset from mongoose
module.exports.delete = (id, presetName) => {
  return Preset.deleteOne({_id: id}).exec();
}
