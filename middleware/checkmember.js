module.exports.ismember = (req, res, next) => {
    const { role } = req.user;
    if(role === 'member'|| role === 'admin'){
      next()
    }else {
      return res.status(403).json({
          error : {
              message : 'คุณไม่มีสิทธิ์ใช้งานส่วนนี้ เฉพาะผู้ดูแลระบบเท่านั้น'
          }
      })
    }
  
  };