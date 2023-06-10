const Member = require("../models/member");
const HttpError = require("../util/http-Error");
const { memberAuthSchema } = require("../util/validator");

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

  let result;
  try {
    result = await memberAuthSchema.validateAsync(req.body);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    return next(
      new HttpError(
        err.message || "Member Validation failed",
        err.status || 401
      )
    );
  }

  const createdMember = new Member({
    ...result,
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

  let result;
  try {
    result = await memberAuthSchema.validateAsync(req.body);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    return next(
      new HttpError(
        err.message || "Member detail Validation failed",
        err.status || 401
      )
    );
  }

  const { name, position, description } = result;

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
