const songService = require('../services/songService');

const baseOptions = {};

module.exports.create = async(ctx) => {
  
try {
    // delete ctx.request.body.id;
    const data = await songService.create(ctx.request.body, baseOptions);
    ctx.io.emit('songAdded', {song: data});
    const response = await songService.list(baseOptions);
    const songs = response.rows;
    const songCount = songs.length;
    if (songCount === 3) {
      ctx.io.emit('startPlay');
    }
    ctx.body = {
      status: 'success',
      data,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: err.message || 'An error has occurred.',
    };
    console.error(err);
  }
}

module.exports.list = async (ctx) => {
  try {
    let opts;
    const baseOpts = {};
   
    // const reqLimit = ctx.request.query.limit;
    // if (reqLimit) {
    //   let reqOffset = ctx.request.query.offset;
    //   reqOffset = (!reqOffset || reqOffset < 0 ? 0 : reqOffset);
    //   opts = Object.assign(baseOpts, {
    //     limit: reqLimit,
    //     offset: reqOffset,
    //   });
    // } else {
    //   opts = baseOpts;
    // }

    const data = await songService.list(baseOpts);
    if (data) {
      ctx.body = {
        status: 'success',
        data,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'Resource does not exist.',
      };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: err.message || 'An error has occurred.',
    };
    // log.error(err);
  }
};

// const log = require('../lib/logger');

// const baseOptions = {};


// module.exports.create = async (ctx) => {
  
// };

// module.exports.get = async (ctx) => {
//   try {
//     const data = await fgsCountryService.getRegion(ctx.params.id, baseOptions);
//     if (data) {
//       ctx.body = {
//         status: 'success',
//         data,
//       };
//     } else {
//       ctx.status = 404;
//       ctx.body = {
//         status: 'error',
//         message: 'Resource does not exist.',
//       };
//     }
//   } catch (err) {
//     ctx.status = 500;
//     ctx.body = {
//       status: 'error',
//       message: err.message || 'An error has occurred.',
//     };
//     log.error(err);
//   }
// };

// module.exports.save = async (ctx) => {
//   try {
//     const data = await fgsCountryService.saveRegion(ctx.params.id, ctx.request.body, baseOptions);
//     if (data) {
//       ctx.body = {
//         status: 'success',
//         data,
//       };
//     } else {
//       ctx.status = 404;
//       ctx.body = {
//         status: 'error',
//         message: 'Resource does not exist.',
//       };
//     }
//   } catch (err) {
//     ctx.status = 500;
//     ctx.body = {
//       status: 'error',
//       message: err.message || 'An error has occurred.',
//     };
//     log.error(err);
//   }
// };

// module.exports.delete = async (ctx) => {
//   try {
//     const data = await fgsCountryService.deleteRegion(ctx.params.id);
//     if (data) {
//       ctx.body = {
//         status: 'success',
//       };
//     } else {
//       ctx.status = 404;
//       ctx.body = {
//         status: 'error',
//         message: 'Resource does not exist.',
//       };
//     }
//   } catch (err) {
//     ctx.status = 500;
//     ctx.body = {
//       status: 'error',
//       message: err.message || 'An error has occurred.',
//     };
//     log.error(err);
//   }
// };