import React, { Component } from "react";

import "./Recovery.css";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

class Recovery extends Component {
  componentDidMount() {
    this.props.fetchCases();
  }

  render() {
    let percentage = (this.props.recovered / this.props.affected) * 100;
    return (
      <div
        className="recovery_container"
        style={{ background: this.props.isDark ? "#25274b" : "#fff" }}
      >
        <div
          className="heading"
          style={{ color: this.props.isDark ? "#ccccea" : "#30313A" }}
        >
          {" "}
          Ratio of Recovery
        </div>

        <figure>
          <svg viewBox="0 0 38 38">
            <circle
              cx="19"
              cy="19"
              r="16"
              fill={this.props.isDark ? "#4b4d80" : "#f5f5f5"}
              stroke={this.props.isDark ? "#4b4d80" : "#f5f5f5"}
            />

            <circle
              cx="19"
              cy="19"
              r="16"
              fill="transparent"
              stroke="#06ba90"
              strokeLinecap="butt"
              strokeWidth="1"
              strokeDasharray={`${percentage} ${100 - percentage}`}
              strokeDashoffset="25"
            />

            <filter id="shadow">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2"
                floodColor="#2fd0aa26"
              />
            </filter>

            <circle
              cx="19"
              cy="19"
              r="10"
              fill={this.props.isDark ? "#7275b5" : "#fff"}
              filter="url(#shadow)"
            />

            <g>
              <text
                x="11"
                y="21"
                fontSize="6px"
                fill={this.props.isDark ? "#ccccea" : "#30313A"}
              >
                {!this.props.isCasesLoading && `${percentage.toFixed(1)}%`}
              </text>
            </g>
          </svg>
        </figure>

        <div className="aff_rec_data">
          <div style={{ color: this.props.isDark ? "#7e83c2" : "#52586A" }}>
            {this.props.affected > 3
              ? `${this.props.affected / 1000}k`
              : this.props.affected}{" "}
            Affected
          </div>

          <div
            style={{
              color: this.props.isDark ? "#7e83c2" : "#52586A",
              marginBottom: "30px",
            }}
          >
            {this.props.recovered > 3
              ? `${this.props.recovered / 1000}k`
              : this.props.recovered}{" "}
            Recovered
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    affected: state.affected,
    recovered: state.recovered,
    isCasesLoading: state.isCasesLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCases: () => {
      dispatch(actions.fetchCases());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);
