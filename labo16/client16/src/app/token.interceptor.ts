import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  req = req.clone({
        setHeaders:{
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + localStorage.getItem("token")
        }
    });

  return next(req);
};
