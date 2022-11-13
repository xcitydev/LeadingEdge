// Copyright iSELL 💳 2022
// 17 U.S.C §§ 101-1511

//importing relevant modules
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./setup.scss";
import dogBot from "../../assets/dogbot.png";
import {
  UilImage,
  UilBellSchool,
  UilCommentAltMessage,
  UilBookmark,
} from "@iconscout/react-unicons";
// import firebase modules
import {
  checkIfUserExist,
  createStore,
  getDataFromUID,
  storage,
} from "../../firebase/firebase.utils";
import { businessTypeOption } from "./setup.store-type";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
import {
  error,
  closeModal,
} from "../../store/error-messages/error-message.reducer";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";

// logo
const countryFlag = require("../../assets/country-icon.png");

//JSX component
const Setup = () => {
  // countries languages
  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  //state
  const [wallet, setWallet] = useState("");

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  // get user uid from state
  const getUserUid: string | null = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );
  console.log(getUserUid);

  // signout user
  // const signOut = () => {

  // }

  // initial value state
  const [values, setValues] = useState({
    businessName: "",
    description: "",
    businessLogoUrl: "",
    imageLogo: "",
    businessType: "default",
    selectedCountry: "default",
    business_wallet: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  // values
  const { imageLogo, businessType, selectedCountry } = values;

  // handle input change
  const handleChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const getDetailsFromDB = async () => {
    if (!getUserUid) return;
    return await getDataFromUID(getUserUid);
  };

  // const getBusinessWallet = async (user) => {
  //   if(!user) return

  // }

  // handle form submit
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!imageLogo && businessType === "default" && selectedCountry) {
      dispatch(error("Fill all inputs"));
      setTimeout(() => {
        dispatch(closeModal(""));
      }, 2000);
      return;
    }
    const user: DocumentData | any = await getDetailsFromDB();

    // console.log(values, 'submit')

    // START

    await window.tronWeb.request({
      method: "tron_requestAccounts",
    });
    const { name, base58 } = window.tronWeb.defaultAddress;
    console.log("addr", base58);

    await uploadImage();

    //// end
    await createStore(base58, values);
    console.log("okay");
  };

  // image input ref
  const imagePicker: React.MutableRefObject<null | any> = useRef(null);

  // dynamically upload pictures
  useEffect(() => {
    uploadImage();
    // eslint-disable-next-line
  }, [imageLogo]);

  // upload image
  const uploadImage = async () => {
    try {
      const file = imagePicker.current.files[0];
      // if (!file) return;
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setValues({
            ...values,
            businessLogoUrl: downloadURL,
          });
        });
      });
    } catch (eror) {
      console.log(eror);
    }
  };

  // showing images
  const addHeaderImage = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setValues({
        ...values,
        imageLogo: readerEvent.target.result,
      });
    };
  };

  // building block
  return (
    <div className="setup">
      <div className="setup__component1">
        <img src={dogBot} alt="robotic dog" className="w-[400px] h-[400px]" />
      </div>
      <div className="setup__component2">
        <div className="form__tag">
          <h2 className="text-2xl py-2 font-semibold">
            Set up Your Business Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="business__name">
              <UilBellSchool className="bus__name" />
              <input
                type="text"
                name="businessName"
                onChange={handleChange}
                value={values.businessName}
                placeholder="Store Name"
              />
            </div>
            <div className="business__description">
              <UilCommentAltMessage className="description" />
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={values.description}
                placeholder="Store Description"
              />
            </div>
            <div className="business__type">
              <UilBookmark className="type" />
              <select
                defaultValue={values.businessType}
                onChange={handleChange}
                name="businessType"
                style={{
                  color: businessType === "default" ? "grey" : "black",
                }}
                required
              >
                <option disabled value="default">
                  Store Category
                </option>
                {businessTypeOption?.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="business__country">
              <img src={countryFlag} className="country" />
              <select
                defaultValue={values.selectedCountry}
                onChange={handleChange}
                name="selectedCountry"
                style={{
                  color: selectedCountry === "default" ? "grey" : "black",
                }}
                required
              >
                <option disabled value="default">
                  Store Country
                </option>
                {!!countryArr?.length &&
                  countryArr.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
              </select>
            </div>
            <div className="upload_sect_img">
              <div className="upload_hd_img">
                {imageLogo ? (
                  <img src={imageLogo} alt="" />
                ) : (
                  //   <UilImage className="image__default" />
                  <div></div>
                )}
              </div>
              <input
                ref={imagePicker}
                hidden
                onChange={addHeaderImage}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
              <div
                className="upload_add_img"
                onClick={() => imagePicker.current.click()}
              >
                <p className="upload__p">Upload your store Logo</p>
              </div>
            </div>
            <button type="submit">Create Store</button>
          </form>
        </div>
      </div>
      <div className="logout">
        <Link to="/">
          <button className="button__logout"> Log Out</button>
        </Link>
      </div>
    </div>
  );
};

export default Setup;
