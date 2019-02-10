const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  username: process.env.FTPUSERNAME,
  password: process.env.FTPPASS,
  host: process.env.FTPHOST,
  port: 21,
  localRoot: __dirname + "/../out/",
  remoteRoot: "/",
  include: ['*']
};

ftpDeploy.deploy(config, function(err) {
  if (err) console.log(err);
  else console.log('finished');
});