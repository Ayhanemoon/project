const Settings = require('../models/setting');
const invoiceEventEmitter = require('./invoiceEventController');

exports.getSetting =  async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings);
};

exports.updateSetting = async (req, res) => {
  try {
    const {invoice} = req.body;
    let setting = await Settings.findOne();
    if (!setting) {
      setting = new Settings();
    }
    //todo -> transaction
    setting.invoice = invoice;
    await setting.save();
    //if invoice changed
    invoiceEventEmitter.update(setting.invoice);
    res.json({ message: 'Settings updated', setting });
  } catch (error) {
    throw new Error('Error updating setting', error);
  }
};