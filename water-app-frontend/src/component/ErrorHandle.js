import React, { useState , useEffect } from "react";
import { useHistory} from 'react-router';

export default function Error(data) {
  const [load, setLoad] = useState(true);
  const history = useHistory()
  const handle = () => {
    setLoad(false);
    history.go();
  };

  return (
    <div>
      {load ? (
        <>
          <div className="errorblock">
            <div className="row">
              <div className="col s8 ">{data.data}</div>
              <div className="right">
                <a
                  className="btn-floating btn-small waves-effect waves-light red"
                  onClick={handle}
                >
                  <i className="material-icons">clear</i>
                </a>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
