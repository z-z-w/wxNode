var express = require('express');
var router = express.Router();
var Maths = require('../models/Math')

/* GET home page. */
router.post('/getMathList', function (req, res, next) {
  const page = parseInt(req.body.page);
  const perPage = 3;
  const start = (page - 1) * perPage;

  const search = req.body.search || '';
  if(!search) {
    Maths.count().then((count) => {
      const pages = Math.ceil(count / perPage);
      Maths.find().sort({_id: -1}).skip(start).limit(perPage).then((data) => {
        res.json({
          code: 0,
          message: '',
          data,
          pages
        })
      });
    })
  } else {
    Maths.count().where({
      question: new RegExp(search + '.*', 'i')
    }).then((count) => {
      const pages = Math.ceil(count / perPage);
      Maths.find().where({
        question: new RegExp(search + '.*', 'i')
      }).sort({_id: -1}).skip(start).limit(perPage).then((data) => {
        res.json({
          code: 0,
          message: '',
          data,
          pages
        })
      });
    })
  }




});

router.post('/delete', function(req, res, next) {
  const id = req.body.id;

  Maths.remove({
    _id: id
  }).then(() => {
    res.json({
      code: 0,
      message: '删除成功',
      data: {}
    })
  })
})

router.post('/getMathItem', function(req, res, next) {
  const id = req.body.id;
  Maths.findOne({
    _id: id
  }).then((math) => {
    if (math) {
      res.json({
        code: 0,
        message: '',
        data: math
      })
    } else {
      res.json({
        code: 0,
        message: '查询问题不存在',
      })
    }
  })
});

router.post('/addMathItem', function (req, res, next){
  const item = req.body.item;
  if(item.option.indexOf(item.rightAnswer) < 0){
    res.json({
      code: 1,
      message: '正确答案不在答案中',
      data: {}
    });
    return;
  } else {
    let newItem = init(item);

    new Maths({...newItem}).save().then((data) => {
      res.json({
        code: 0,
        message: '保存成功',
        data
      })
    });
  }
})

router.post('/modifyMathItem', function(req, res, next) {
  const item = req.body.item;
  let newItem = init(item);
  Maths.update({
    _id: newItem._id
  }, newItem).then((data) => {
    res.json({
      code: 0,
      message: '修改成功',
      data
    })
  })
})

function init(item) {
  if(item.option.indexOf('、') > -1) {
    item.option = item.option.split('、');
  }
  if(item.images && item.images.indexOf('、') > -1) {
    item.images = item.images.split('、');
  }
  return item;
}

module.exports = router;
