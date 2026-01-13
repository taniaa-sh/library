import imagesAddresses from "./imageAddresses";
import SiteUrls from "./routs";

export const menuItems = [
    {
        title: "Home",
        image: imagesAddresses.icons.home,
        activeImage: imagesAddresses.icons.homeActive,
        link: SiteUrls.admin,
        id: 1
    },
    {
        title: "All Users",
        image: imagesAddresses.icons.allUser,
        activeImage: imagesAddresses.icons.allUserActive,
        link: SiteUrls.adminAllUser,
        id: 2
    },
    {
        title: "All Books",
        image: imagesAddresses.icons.allBooks,
        activeImage: imagesAddresses.icons.allBooksActive,
        link: SiteUrls.adminAllBooks,
        id: 3
    },
    {
        title: "Borrow Requests",
        image: imagesAddresses.icons.borrowReq,
        activeImage: imagesAddresses.icons.borrowReqActive,
        link: SiteUrls.adminBorrowReq,
        id: 4
    },
    {
        title: "Account Requests",
        image: imagesAddresses.icons.accountReq,
        activeImage: imagesAddresses.icons.accountReqActive,
        link: SiteUrls.adminAccountReq,
        id: 5
    },
    {
        title: "All Admins",
        image: imagesAddresses.icons.allUser,
        activeImage: imagesAddresses.icons.allUserActive,
        link: SiteUrls.allAdmins,
        id: 6
    },
]