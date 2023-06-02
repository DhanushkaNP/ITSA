async function getAllMembers(req, res, next) {
  res.send("All Members");
}

async function createNewMember(req, res, next) {
  res.send("Added new Member");
}

async function updateMember(req, res, next) {
  const memberId = req.params.mid;
  res.send(`member ${memberId} updated`);
}

async function deleteMember(req, res, next) {
  const memberId = req.params.mid;
  res.send(`member ${memberId} deleted`);
}

exports.getAllMembers = getAllMembers;
exports.createNewMember = createNewMember;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember;
