import md5 from "md5";

export const createGravatarUrl = (email) => {
    return `https://www.gravatar.com/avatar/${md5(email, {encoding: "binary"})}?d=retro`;
}