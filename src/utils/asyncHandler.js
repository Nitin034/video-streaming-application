const asyncHandler = (requestHandler) => {
   return (req, res, next) => {
        Promise.resolve(requestHandler(res, res , next)).catch((err) => next(err))
    }
}

export {asyncHandler}