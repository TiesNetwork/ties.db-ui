const contractMiddleware = store => next => action => {
  if (action.contract && action.types) {
    const [REQUESTED, RESOLVED, REJECTED] = action.types;

    next({ ...action, type: REQUESTED });

    return action.contract
      .then(res => {
        console.log(res);
        return next({ ...action, type: RESOLVED });
      })
      .catch(err => {
        console.error(err);
        return next({ ...action, type: REJECTED });
      });
  } else {
    return next(action);
  }
}

export default contractMiddleware;
