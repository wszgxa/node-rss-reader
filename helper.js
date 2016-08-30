/**
 * @resMsg
 * @param {Boolen} sucStatus 返回状态
 * @param {any} message 提示语句
 * @param {any} data 返回数据
 * @returns
 */
export function resMsg(sucStatus, message, data) {
  if (sucStatus == undefined) {
    throw new Error('没有成功状态')
  }
  if (message == undefined) {
    throw new Error('没有成功语句')
  }
  return {
    success: sucStatus,
    data: data,
    message: message
  }
}

/**
 * @param  {Object} default  默认的对象，包括错误信息与状态码
 * @param  {Object} extra    附加的说明与参数
 */
export class koaErr extends Error {
  constructor ({ message = 'Error', status = 500 } = {}, ...args) {
    super()
    this.message = message
    this.status = status
    if (args.length > 0) {
      extend(this, args[0])
    }
  }
}
