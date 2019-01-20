import React, { Component } from "react";
import Slide from "./Slide";

class ImageSlider extends Component {

     constructor(props) {
          super(props);
          this.state = {
               currentIndex: 0
          }
     }

     handleClose = () => {
          this.setState({ currentIndex: 0 });
          this.props.hide("showImageSlider");
     }

     goToNextSlide = (e) => {
          e.stopPropagation();
          if (this.state.currentIndex === this.props.images.length - 1) {
               return this.setState({ currentIndex: 0 })
          }
          this.setState(prevState => ({
               currentIndex: prevState.currentIndex + 1
          }));
     }

     goToPrevSlide = (e) => {
          e.stopPropagation();
          if (this.state.currentIndex === 0) {
               return this.setState({ currentIndex: this.props.images.length - 1 })
          }
          this.setState(prevState => ({
               currentIndex: prevState.currentIndex - 1
          }));
     }

     render () {
          const { currentIndex } = this.state;
          const { show, images } = this.props;
          const showHideClassName = show ? "modal display-flex" : "modal display-none";
          const imageSlides = images.map((image, i) => <Slide key={i} image={image}/> );

          return show ? (
               <div className={showHideClassName} name="modal" onClick={this.handleClose}>
                    <div className="slider">
                         <div className="slider-wrapper">
                              <span>{`Image ${currentIndex + 1} of ${images.length}`}</span>
                              <i className="fas fa-arrow-alt-circle-right right-arrow" onClick={this.goToNextSlide}></i>
                              <i className="fas fa-arrow-alt-circle-left left-arrow" onClick={this.goToPrevSlide}></i>
                              { imageSlides[currentIndex] }
                         </div>
                    </div>
               </div>
          ) : null;
     }

}

export default ImageSlider;