if(!me || 'admin' != me.username){
    cancel('No authorization, 401');
}