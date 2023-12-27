module.exports = requiredRoles => (req, res, next) => {
  if (requiredRoles.includes(req.user.role)) {
    next();
  } else {
    res.status(403).send({ message: 'Access denied' });
  }
};
