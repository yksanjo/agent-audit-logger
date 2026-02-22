const test = require('node:test');
const assert = require('node:assert/strict');
const { AuditLogService } = require('../dist/audit.js');

test('audit log service keeps chain integrity', async () => {
  const svc = new AuditLogService({ name: 'repo', retentionYears: 2 });
  await svc.log({ action: 'create', actor: 'alice', target: 'wf-1', targetType: 'artifact' });
  await svc.log({ action: 'approve', actor: 'bob', target: 'wf-1', targetType: 'artifact' });
  const integrity = svc.verifyIntegrity();
  assert.equal(integrity.valid, true);
});
