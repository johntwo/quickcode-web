import SparkMD5 from 'spark-md5'

/**
 * 获取文件的md5
 * @param value
 * @returns {*|string}
 */
export default (file) => {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunkSize = 2097152 // Read in chunks of 2MB
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()
  let hasEnd = false
  let intetval = null

  fileReader.onload = function(e) {
    // console.log('read chunk nr', currentChunk + 1, 'of', chunks)
    spark.append(e.target.result) // Append array buffer
    currentChunk++

    if (currentChunk < chunks) {
      loadNext()
    } else {
      hasEnd = true
      // console.log('finished loading')
      // console.info('computed hash', spark.end()) // Compute hash
    }
  }

  fileReader.onerror = function() {
    console.warn('oops, something went wrong.')
  }

  function loadNext() {
    const start = currentChunk * chunkSize
    const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
  }

  loadNext()

  return new Promise((resolve, reject) => {
    intetval = setInterval(function() {
      if (hasEnd === true) {
        window.clearInterval(intetval)
        resolve(spark.end() + '.' + file.name.substring(file.name.lastIndexOf('.') + 1))
      }
    }, 100)
  })
}
