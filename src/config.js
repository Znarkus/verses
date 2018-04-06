'use strict'

exports.port = process.env.PORT || 5000
exports.domain = process.env.DOMAIN || 'localhost'
exports.host = `${exports.domain}:${exports.port}`
