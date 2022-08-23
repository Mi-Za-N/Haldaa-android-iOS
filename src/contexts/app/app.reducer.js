export const initialState = {
  showSale: [],
  showRent:[],
  allEvents: [],
  featuredData: [],
  userProperty: [],
  tolets: [],
  searchTolets:[],
  searchRents:[],
  searchTutors:[],
  userTolet:[],
  tutors:[],
  userTutors:[],
  rents: [],
  userRents:[],
  districs:[],
  tuitions:[],
  courses: [],
  showTuitions:[],
  profile: {},
  isLogin: false,


  searchTerm: '',
  allProductInfo: [],
  showProductInfo: [],
  sidebarData: [],
  orderInfo: [],
};


export function appReducer(state = initialState, action) {
  // console.log(action.payload);
  switch (action.type) {

     case 'SAVE_PRODUCT_INFO':
      return {
        ...state,
        allProductInfo: action.payload,
        // showProductInfo: action.payload,
        showProductInfo: action.payload.filter(sp => sp.isFeatured === true), 
      };
    case 'SAVE_SIDEBAR_DATA':
      return {
        ...state,
        sidebarData: action.payload,
      };
    case 'SAME_TYPE_PRODUCT_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(p => p.category._id === action.payload),
      };
    case 'SUBTYPE_PRODUCT_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(p => p.subCategory._id === action.payload),
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(pP => pP.name.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case 'SAVE_ORDER_INFO':
      return {
        ...state,
        orderInfo: action.payload,
      };
    case 'SAVE_EVENTS':
      return {
        ...state,
        allEvents: action.payload,
        showSale: action.payload, 
      };
    case 'SAVE_FEATURED_DATA':
      return {
        ...state,
        featuredData: action.payload,
        showFeatured: action.payload
      };
    case 'SAVE_USER_PROPERTY':
      return {
        ...state,
        userProperty: action.payload,
        showUserEvent: action.payload
      };
    case 'SAVE_TOLETS':
      return {
        ...state,
        tolets: action.payload,
        showTolets: action.payload,
        searchTolets: action.payload
      };
   case 'SAVE_USER_TOLET':
      return {
        ...state,
        userTolet: action.payload,
        showUserEvent: action.payload
      };
   case 'SAVE_TUTORS':
      return {
        ...state,
        tutors: action.payload,
        showTutors: action.payload,
        searchTutors: action.payload,
        // male: action.payload.filter(sp => sp.gender === false), 
        // femal: action.payload.filter(sp => sp.gender === true), 
      };
   case 'SAVE_USER_TUTORS':
      return {
        ...state,
        userTutors: action.payload,
        showUserEvent: action.payload
      };
   case 'SAVE_TUTION':
      return {
        ...state,
        tuitions: action.payload,
        showTuitions: action.payload
      };
    case 'SAVE_RENTS':
      return {
        ...state,
        rents: action.payload,
        showRent: action.payload,
        searchRents: action.payload
      };
   case 'SAVE_USER_RENTS':
      return {
        ...state,
        userRents: action.payload,
      };
 case 'SAVE_DISTRICS':
      return {
        ...state,
        districs: action.payload,
      };
   case 'SAVE_COURSES':
      return {
        ...state,
        courses: action.payload,
      };
   case 'SAVE_USER_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        showTolets: state.searchTolets.filter(pP => pP.location.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case 'SET_SEARCH_RENT':
      return {
        ...state,
        showRent: state.searchRents.filter(pP => pP.location.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case 'SET_SEARCH_TUTORS':
      return {
        ...state,
        showTutors: state.searchTutors.filter(pP => pP.tutoringLocation.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case 'PROPERTY_FILTER':
      return {
        ...state,
        showSale: state.allEvents.filter(p => p.distric._id === action.payload),
      };
    case 'RENT_FILTER':
      return {
        ...state,
        showRent: state.rents.filter(p => p.distric._id === action.payload),
      };
    case 'TOLET_FILTER':
      return {
        ...state,
      showTolets: state.tolets.filter(p => p.distric._id === action.payload),
      };
    case 'TUTOR_FILTER':
      return {
        ...state,
      showTutors: state.tutors.filter(p => p.distric._id === action.payload),
      };
    case 'FEMALE_FILTER':
      return {
        ...state,
      showTutors: state.tutors.filter(p => p.gender === true),
      };
   case 'MALE_FILTER':
      return {
        ...state,
      showTutors: state.tutors.filter(p => p.gender === false),
      };
    case 'IS_LOGIN':
      return {
        ...state,
        isLogin: action.payload,
      };
    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
