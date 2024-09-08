/**
 * @file analyse.js
 * @brief Ce module exporte un composant SVG représentant une icône Analyse.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ fill = "#000", height = "56px", width = "56px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#7B83E2"/>
    <path d="M43 28.5C43 27.1753 42.6242 25.8777 41.9162 24.7581C41.2081 23.6385 40.1969 22.7428 39 22.175V21C38.9991 19.7114 38.5834 18.4574 37.8144 17.4234C37.0453 16.3895 35.9639 15.6306 34.73 15.259C33.4962 14.8874 32.1755 14.923 30.9634 15.3604C29.7513 15.7977 28.7123 16.6137 28 17.6875C27.2877 16.6137 26.2486 15.7977 25.0365 15.3604C23.8244 14.923 22.5037 14.8874 21.2699 15.259C20.036 15.6306 18.9546 16.3895 18.1856 17.4234C17.4166 18.4574 17.0008 19.7114 17 21V22.175C15.8029 22.7426 14.7915 23.6383 14.0832 24.7579C13.375 25.8776 12.999 27.1752 12.999 28.5C12.999 29.8249 13.375 31.1225 14.0832 32.2421C14.7915 33.3618 15.8029 34.2574 17 34.825V35C17.0008 36.2886 17.4166 37.5427 18.1856 38.5766C18.9546 39.6106 20.036 40.3695 21.2699 40.7411C22.5037 41.1126 23.8244 41.0771 25.0365 40.6397C26.2486 40.2023 27.2877 39.3863 28 38.3125C28.7123 39.3863 29.7513 40.2023 30.9634 40.6397C32.1755 41.0771 33.4962 41.1126 34.73 40.7411C35.9639 40.3695 37.0453 39.6106 37.8144 38.5766C38.5834 37.5427 38.9991 36.2886 39 35V34.825C40.1959 34.2561 41.2063 33.3601 41.9142 32.2407C42.6221 31.1214 42.9986 29.8244 43 28.5ZM23 39C22.0131 38.9994 21.0613 38.6341 20.3275 37.9741C19.5937 37.3142 19.1298 36.4063 19.025 35.425C19.3475 35.4758 19.6735 35.5009 20 35.5H21C21.2652 35.5 21.5195 35.3947 21.7071 35.2071C21.8946 35.0196 22 34.7652 22 34.5C22 34.2348 21.8946 33.9805 21.7071 33.7929C21.5195 33.6054 21.2652 33.5 21 33.5H20C18.8216 33.498 17.6818 33.0799 16.7817 32.3195C15.8816 31.559 15.279 30.5051 15.0801 29.3436C14.8813 28.1822 15.0991 26.9878 15.6951 25.9713C16.291 24.9547 17.2269 24.1813 18.3375 23.7875C18.5318 23.7159 18.6995 23.5865 18.818 23.4166C18.9364 23.2467 18.9999 23.0446 19 22.8375V21C19 19.9392 19.4214 18.9217 20.1715 18.1716C20.9217 17.4215 21.9391 17 23 17C24.0608 17 25.0782 17.4215 25.8284 18.1716C26.5785 18.9217 27 19.9392 27 21V30.5375C25.9052 29.5439 24.4784 28.9955 23 29C22.7347 29 22.4804 29.1054 22.2929 29.2929C22.1053 29.4805 22 29.7348 22 30C22 30.2652 22.1053 30.5196 22.2929 30.7071C22.4804 30.8947 22.7347 31 23 31C24.0608 31 25.0782 31.4215 25.8284 32.1716C26.5785 32.9217 27 33.9392 27 35C27 36.0609 26.5785 37.0783 25.8284 37.8285C25.0782 38.5786 24.0608 39 23 39ZM36 33.5H35C34.7347 33.5 34.4804 33.6054 34.2929 33.7929C34.1053 33.9805 34 34.2348 34 34.5C34 34.7652 34.1053 35.0196 34.2929 35.2071C34.4804 35.3947 34.7347 35.5 35 35.5H36C36.3264 35.5009 36.6525 35.4758 36.975 35.425C36.8928 36.1938 36.5897 36.9222 36.1022 37.5222C35.6147 38.1223 34.9638 38.5682 34.2282 38.806C33.4926 39.0439 32.7038 39.0634 31.9573 38.8624C31.2108 38.6613 30.5386 38.2482 30.0219 37.6731C29.5053 37.098 29.1664 36.3855 29.0462 35.6217C28.9261 34.858 29.0298 34.0759 29.3448 33.3699C29.6599 32.6639 30.1728 32.0643 30.8215 31.6438C31.4702 31.2232 32.2269 30.9996 33 31C33.2652 31 33.5195 30.8947 33.7071 30.7071C33.8946 30.5196 34 30.2652 34 30C34 29.7348 33.8946 29.4805 33.7071 29.2929C33.5195 29.1054 33.2652 29 33 29C31.5215 28.9955 30.0948 29.5439 29 30.5375V21C29 19.9392 29.4214 18.9217 30.1715 18.1716C30.9217 17.4215 31.9391 17 33 17C34.0608 17 35.0782 17.4215 35.8284 18.1716C36.5785 18.9217 37 19.9392 37 21V22.8375C37 23.0446 37.0635 23.2467 37.182 23.4166C37.3004 23.5865 37.4681 23.7159 37.6625 23.7875C38.7731 24.1813 39.7089 24.9547 40.3048 25.9713C40.9008 26.9878 41.1186 28.1822 40.9198 29.3436C40.721 30.5051 40.1183 31.559 39.2182 32.3195C38.3181 33.0799 37.1783 33.498 36 33.5ZM19.5 28C19.2347 28 18.9804 27.8947 18.7929 27.7071C18.6053 27.5196 18.5 27.2652 18.5 27C18.5 26.7348 18.6053 26.4805 18.7929 26.2929C18.9804 26.1054 19.2347 26 19.5 26C20.162 25.9967 20.796 25.7323 21.2641 25.2642C21.7322 24.796 21.9967 24.1621 22 23.5V22.5C22 22.2348 22.1053 21.9805 22.2929 21.7929C22.4804 21.6054 22.7347 21.5 23 21.5C23.2652 21.5 23.5195 21.6054 23.7071 21.7929C23.8946 21.9805 24 22.2348 24 22.5V23.5C24 24.6935 23.5259 25.8381 22.6819 26.682C21.838 27.5259 20.6934 28 19.5 28ZM37.5 27C37.5 27.2652 37.3946 27.5196 37.2071 27.7071C37.0195 27.8947 36.7652 28 36.5 28C35.3065 28 34.1619 27.5259 33.318 26.682C32.4741 25.8381 32 24.6935 32 23.5V22.5C32 22.2348 32.1053 21.9805 32.2929 21.7929C32.4804 21.6054 32.7347 21.5 33 21.5C33.2652 21.5 33.5195 21.6054 33.7071 21.7929C33.8946 21.9805 34 22.2348 34 22.5V23.5C34.0032 24.1621 34.2677 24.796 34.7358 25.2642C35.204 25.7323 35.8379 25.9967 36.5 26C36.7652 26 37.0195 26.1054 37.2071 26.2929C37.3946 26.4805 37.5 26.7348 37.5 27Z" fill="white"/>
    </svg>`,
        fill,
        height,
        width,
        ...props,
    })