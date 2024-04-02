import Card from "../UI/Card";
import classes from "./MakeSellRequest.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {companyOrgnumSearch, save_company} from "../../store/brreg-http";
import React from "react";
import {brregActions} from "../../store/brreg-slice";
import {infoActions} from "../../store/info-slice";
import store from "../../store";

const validateOrgnum = (numstr) => {
    const mStr = String(numstr);
    if (mStr.length !== 9) {
        return false;
    }
    const regex = /^[0-9]*$/;
    return mStr.toLowerCase()
        .match(
            regex
        ) != null;
};

const MyBusiness = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const brreg_company_name    = useSelector((state) => state.brreg.name);
    const brreg_company_address = useSelector((state) => state.brreg.address);
    const saved_confirmed       = useSelector((state) => state.info.confirmed);
    const company_saved         = useSelector((state) => state.brreg.ok_saved);
    const company_num           = useSelector((state) => state.brreg.company_num);
    const account_number        = useSelector((state) => state.brreg.account_number);
    const bill_name             = useSelector((state) => state.brreg.bill_name);

    const orgnumInputRef = useRef(company_num);
    const selfnameRef    = useRef(bill_name);
    const accountnumRef  = useRef(account_number);

    const [showCompanyMenu   , setShowCompanyMeny  ] = useState(!(!brreg_company_address) );
    const [showCompany       , setShowCompany      ] = useState(!(!brreg_company_address));
    const [showCompanyLookup , setShowCompanyLookup] = useState(validateOrgnum(company_num));
    const [companyName       , setCompanyName      ] = useState(brreg_company_name);
    const [companyAddress    , setCompanyAddress   ] = useState(brreg_company_address);
    const [readyToSubmit     , setIsReadyToSubmit  ] = useState((companyName && companyAddress && accountnumRef.current.value)
                                                            || (selfnameRef.current.value && accountnumRef.current.value));

    const evaluateInputs = () => {
        if (showCompanyMenu) {
            setIsReadyToSubmit(
                companyName && companyAddress && accountnumRef.current.value
            );
        } else {
            setIsReadyToSubmit(
                selfnameRef.current.value && accountnumRef.current.value
            );
        }
    };

    const submitClicked = () => {
        dispatch(save_company(
            selfnameRef.current.value ,
            accountnumRef.current.value ,
            companyName ,
            orgnumInputRef.current.value ,
            companyAddress
        ));
    };

    useEffect(() => {
        if(company_saved) {
            dispatch(infoActions.setPurpose('SAVE CONFIRMED'));
            dispatch(infoActions.setInformation({
                title : 'VIRKSOMHETEN LAGRET' ,
                message: 'Du kan lukke dette vinduet'
            }));
        }
    } , [company_saved, dispatch]);

    useEffect(() => {
        const purpose = store.getState().info.purpose;
        if(purpose === 'SAVE CONFIRMED') {
            dispatch(infoActions.setPurpose(''));
            dispatch(infoActions.setConfirmed(false));
            dispatch(brregActions.set_ok_saved(false));
            navigate(store.getState().brreg.business_back_page);
        }
    } , [saved_confirmed, dispatch, navigate]);

    useEffect(() => {
        if(brreg_company_name && brreg_company_address) {
            setShowCompany(true);
            setCompanyName(brreg_company_name);
            setCompanyAddress(brreg_company_address);
        } else {
            setCompanyName('');
            setCompanyAddress('');
            setShowCompany(false);
        }
        evaluateInputs();
    } , [brreg_company_name, brreg_company_address, evaluateInputs]);

    const backClicked = (event) => {
        navigate(store.getState().brreg.business_back_page);
    };

    const orgnumChanged = (event) => {
        const is_valid = validateOrgnum(orgnumInputRef.current.value);
        setShowCompanyLookup(is_valid);
    };

    const companySearchClicked = (event) => {
        dispatch(companyOrgnumSearch(orgnumInputRef.current.value));
    };

    const showCompanyMenuChanged = (event) => {
        setShowCompanyMeny(!showCompanyMenu);
    };

    const resetBrregSearchClicked = () => {
        dispatch(brregActions.set_name(''));
        dispatch(brregActions.set_address(''));
        orgnumInputRef.current.value = '';
        evaluateInputs();
    };

    const selfnameChanged = (event) => {
        evaluateInputs();
    };

    const accountnumChanged = (event) => {
        evaluateInputs();
    };

    return (
        <div>
            <div>
                <h1 className={classes.header}>VIRKSOMHETEN MIN</h1>
                <p className={classes.paragraph}>NÅR DU HAR NOE Å SELGE SÅ MÅ VI VITE LITT MER OM VIRKSOMHETEN DIN. DET ER FORDI AT NÅR
                DU HAR SOLGT NOE (FOR EKSEMPEL VED) SÅ VIL VEDBJØRN LAGE EN REGNING TIL SEG SELV FRA DEG OG DENNE REGNINGEN VIL VEDBJØRN SÅ BETALE
                    INN TIL DIN KONTO. PÅ DENNE REGNINGEN (SOM DU VIL FÅ TILSENDT EN KOPI AV PER EPOST) MÅ DET
                FREMKOMME NOK INFORMASJON TIL AT DIN REGNSKAPSFØRER KAN GODKJENNE DET OG DA MÅ VI VITE LITT MER OM DISSE TINGENE.</p>
            </div>

            <Card>
                <label className={classes.label} htmlFor='selfname'>NAVN PÅ REGNINGEN</label>
                <br/>
                <input
                    className={classes.input}
                    onChange={selfnameChanged}
                    type='selfname' id='selfname'
                    required ref={selfnameRef}
                    defaultValue={bill_name}
                />
                <div>
                    <label className={classes.label} htmlFor='accountnum'>KONTO NUMMER</label>
                    <br/>
                    <input
                        className={classes.input}
                        onChange={accountnumChanged}
                        type='accountnum' id='accountnum'
                        required ref={accountnumRef}
                        defaultValue={account_number}
                    />
                </div>
            </Card>

            <div className={classes.centralize}>
                <p className={classes.paragraph}>HAR DU EGET SELSKAP? KLIKK HER</p>
                <input
                    className={classes.checkbox}
                    type='checkbox'
                    checked={showCompanyMenu}
                    onChange={showCompanyMenuChanged}
                />
            </div>

            {showCompanyMenu &&
                <Card>
                    <div>
                        <label className={classes.label} htmlFor='orgnum'>ORGANISASJONS NUMMER (9 SIFFER)</label>
                        <input
                            className={classes.input}
                            onChange={orgnumChanged}
                            type='orgnum' id='orgnum'
                            required ref={orgnumInputRef}
                            defaultValue={company_num}
                        />
                        {showCompanyLookup &&
                            <div>
                                <button className={classes.button_tool} onClick={companySearchClicked}>SØK..</button>
                            </div>
                        }
                        {showCompany &&
                            <div>
                                <p className={classes.paragraph}>NAVN : {companyName}</p>
                                <p className={classes.paragraph}>ADRESSE : {companyAddress}</p>
                            </div>
                        }
                    </div>

                    <div className={classes.buttons}>
                        <button className={classes.button_tool} onClick={resetBrregSearchClicked}>TILBAKESTILLE</button>
                    </div>

                </Card>
            }

            {readyToSubmit &&
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={submitClicked}>LAGRE</button>
                </div>
            }

            <div className={classes.buttons}>
                <button className={classes.button_orange} onClick={backClicked}>TILBAKE</button>
            </div>
        </div>
    );
};

export default MyBusiness;
