module.exports = {
  apps: [{
    name: 'DeimosAPI',
    script: 'npm',
    args: 'start',
    log_file: './logs/logs_deimos.txt',
    merge_logs: true,
  }],
}
