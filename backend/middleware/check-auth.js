const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('token', req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "all_heilòljdfavonioeuòvbònx,oog.C°Slgcèpxohi455poivd5454oiu98798789hnvto098pdnuyiodutbn@#^§oiutyidoudvbdxviycv");
    next();
  } catch (error) {
    res.status(401).json({massage: 'Auth Failed!'});
  }
}
