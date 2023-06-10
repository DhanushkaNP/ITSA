const Member = require("../models/member");
const HttpError = require("../util/http-Error");

async function getAllMembers(req, res, next) {
  let members;
  try {
    members = await Member.find();
  } catch (err) {
    return next(
      new HttpError("Something went wrong when getting all members", 500)
    );
  }

  if (members.length === 0) {
    return next(new HttpError("Didn't found any member", 422));
  }

  res.status(200).json({ members });
}

async function createNewMember(req, res, next) {
  const image = "https://www.gstatic.com/webp/gallery3/2_webp_ll.png";

  const { name, position, description } = req.body;

  const createdMember = new Member({
    name,
    position,
    description,
    image,
  });

  try {
    await createdMember.save();
  } catch (err) {
    return next(new HttpError("Creating member failed", 500));
  }
  res.send("member created").status(201);
}

async function updateMember(req, res, next) {
  const memberId = req.params.mid;
  const { name, position, description } = req.body;

  let foundMember;
  try {
    foundMember = await Member.findById(memberId);
  } catch (err) {
    return next(
      new HttpError("Didn't found any member related to given id", 404)
    );
  }

  foundMember.name = name;
  foundMember.position = position;
  foundMember.description = description;

  try {
    foundMember.save();
  } catch (err) {
    return next(
      new HttpError(
        "Couldn't update member,Something went wrong when saving",
        500
      )
    );
  }
  res.send(`member ${memberId} updated`).status(200);
}

async function deleteMember(req, res, next) {
  const memberId = req.params.mid;

  try {
    await Member.findByIdAndDelete(memberId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't delete the member", 500)
    );
  }

  res.status(200).send("Member deleted");
}

exports.getAllMembers = getAllMembers;
exports.createNewMember = createNewMember;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember;
