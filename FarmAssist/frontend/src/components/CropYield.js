import React from "react";
import "../css/cr.css";
import state_arr from "./state.json";
import crop_arr from "./crop.json";
import CropYieldResult from "./CropYieldResult";
import { BsInfoCircleFill } from "react-icons/bs";
import { CropYieldPredict } from "../api/CropYieldPredict";
import InfoModal from "./InfoModal";
function CropYield() {
  var season = ["Summer", "Kharif", "Autumn", "Rabi", "Winter", "Annual"];
  const [state, setState] = React.useState("Select State");
  const [show, setShow] = React.useState(false);
  const [prediction, setPrediction] = React.useState("");
  const [tempData, setTempData] = React.useState(null);
  const [humidData, setHumidData] = React.useState(null);
  const [rainData, setRainData] = React.useState(null);
  const [seasonData, setSeasonData] = React.useState(null);
  const [yearData, setYearData] = React.useState(null);
  const [showInfo, setShowInfo] = React.useState(false);
  const [temperature, setTemperature] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [rainfall, setRainfall] = React.useState("");
  const handleChange = (event) => {
    setState(event.target.value);
  };
  const [info, setInfo] = React.useState({
    season: false,
    temperature: false,
    humidity: false,
    rainfall: false,
  });
  const [formdata, setFormdata] = React.useState({
    crop: "",
    area: "",
    season: "",
    city: "",
  });
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevValue) => {
      return {
        ...prevValue,
        [name]: value.trim(),
      };
    });
  };
  const handlePredict = (event) => {
    event.preventDefault();
    const res = CropYieldPredict(formdata);
    res.then((data) => {
      setTemperature(data.response.result.temperature + " °C");
      setHumidity(data.response.result.humidity + " %");
      setRainfall(data.response.result.rainfall + " mm");
      setShow(true);
      setShowInfo(true);
      setTempData(data.response.result.temp_yield);
      setHumidData(data.response.result.humid_yield);
      setRainData(data.response.result.rain_yield);
      setSeasonData(data.response.result.season_yield);
      setYearData(data.response.result.year_yield);
      setPrediction(data.response.result.prediction);
    });
  };
  const handleReset = (event) => {
    event.preventDefault();
    document.getElementById("formdata").reset();
    setState("Select State");

    setShow(false);
  };
  const handleInfo = (name) => {
    setInfo({
      ...info, // copy the existing state
      [name]: true, // update the property corresponding to the clicked button
    });
  };

  return (
    <>
      <div className="cr">
        <form id="formdata">
          <div className="form-group">
            <label htmlFor="crop">
              <b>Crop</b>
            </label>
            <select
              id="crop"
              className="form-control"
              name="crop"
              required
              onChange={handleFormChange}
            >
              <option value="">Select Crop</option>
              {crop_arr["crops"].map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="area">
              <b>Area (in acre)</b>
            </label>
            <input
              type="number"
              className="form-control"
              min="0"
              id="area"
              name="area"
              placeholder="Enter the value"
              required
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="season">
              <b>Crop Season</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("season");
                }}
              />
              {showInfo && info["season"] && (
                <InfoModal
                  title="Season"
                  body={seasonData}
                  info={info}
                  setInfo={setInfo}
                  cryield={true}
                  graph={true}
                />
              )}
            </label>
            <select
              id="season"
              className="form-control"
              name="season"
              required
              onChange={handleFormChange}
            >
              <option value="-1">Select Season</option>
              {season.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="State">
              <b>State</b>
            </label>
            <select
              id="sts"
              name="stt"
              className="form-control"
              onChange={handleChange}
              required
            >
              {Object.keys(state_arr).map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <label htmlFor="city">
              <b>City</b>
            </label>
            <select
              id="city"
              className="form-control"
              name="city"
              required
              onChange={handleFormChange}
            >
              <option value="">Select City</option>
              {state_arr[state].map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="temp">
              <b>Temperature (in °C)</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("temperature");
                }}
              />
              {showInfo && info["temperature"] && (
                <InfoModal
                  title="Temperature"
                  body={tempData}
                  info={info}
                  setInfo={setInfo}
                  cryield={true}
                  graph={true}
                />
              )}
            </label>
            <input
              className="form-control"
              id="temp"
              name="temp"
              placeholder="Temperature"
              disabled
              value={temperature}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hum">
              <b>Humidity (in %)</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("humidity");
                }}
              />
              {showInfo && info["humidity"] && (
                <InfoModal
                  title="Humidity"
                  body={humidData}
                  info={info}
                  setInfo={setInfo}
                  cryield={true}
                  graph={true}
                />
              )}
            </label>
            <input
              className="form-control"
              id="hum"
              name="hum"
              placeholder="Humidity"
              disabled
              value={humidity}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rain">
              <b>Rainfall (in mm)</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("rainfall");
                }}
              />
              {showInfo && info["rainfall"] && (
                <InfoModal
                  title="Rainfall"
                  body={rainData}
                  info={info}
                  setInfo={setInfo}
                  cryield={true}
                  graph={true}
                />
              )}
            </label>
            <input
              className="form-control"
              id="rain"
              name="rain"
              placeholder="Rainfall"
              disabled
              value={rainfall}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-info crbtn"
              onClick={handlePredict}
            >
              Predict
            </button>
            <button
              type="reset"
              className="btn btn-danger crbtn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
        {show && (
          <CropYieldResult
            show={show}
            setShow={setShow}
            prediction={prediction}
            area={formdata.area}
            crop={formdata.crop}
            yearData={yearData}
            body={` <p>The details of the crop yield prediction are as follows:</p><ul><li>Crop Name: ${
              formdata.crop
            }</li><li>Area: ${formdata.area}</li><li>Season: ${
              formdata.season
            }</li><li>City: ${
              formdata.city
            }</li><li>Temperature: ${temperature}</li><li>Humidity: ${humidity}</li><li>Rainfall: ${rainfall}</li></ul>    <p>
      Recommended Fertilize: ${prediction.data}
    </p>
<p>Our analysis indicates that the expected yield for your crop in the given conditions is ${(
              prediction / formdata.area
            ).toFixed(2)} kg per acre.</p>
   <p>Please note that this is an estimate based on the information you provided. Actual yield may vary depending on several factors such as weather, pests and diseases, soil fertility, and crop management practices.</p>
   <p>Thank you for choosing QuickCrop for your crop yield estimation needs.</p>
`}
          />
        )}
      </div>
    </>
  );
}

export default CropYield;
