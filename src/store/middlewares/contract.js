const contractMiddleware = store => next => action => {
  if (action.contract && action.types) {
    const [REQUESTED, RESOLVED, REJECTED] = action.types;

    next({ ...action, type: REQUESTED });

    return action.contract
      .then(res => {
        next({ ...action, type: RESOLVED });
      })
      .catch(err => {
        console.error(err);
        next({ ...action, type: REJECTED });
      });
  } else {
    return next(action);
  }
}

export default contractMiddleware;
