import React, { Component } from 'react';
import { HOST_DEVOPS } from 'Constans';
import styles from './Main.module.scss';

class Main extends Component {
  render() {
    return (
      <main id="wmpoContents" className={this.props.className}>
        {(this.props.title || (this.props.path && this.props.path.length > 0)) && (
          <div id="mFeature">
            {this.props.path && this.props.path.length > 0 && (
              <div className={styles.path}>
                <a href={`${HOST_DEVOPS}/deploy/index`} className={styles.home}>
                  <i className="fa fa-home" />
                  Home
                </a>
                {this.props.path.map((path, key) => {
                  if (path.href) {
                    return (
                      <a key={key} href={path.href} className={styles.depth}>
                        {path.name}
                      </a>
                    );
                  }
                  return (
                    <span key={key} className={styles.depth}>
                      {path.name}
                    </span>
                  );
                })}
              </div>
            )}
            {this.props.title && (
              <div className={styles.title}>
                <h2>
                  <i className="far fa-arrow-alt-circle-left" /> {this.props.title}
                </h2>
              </div>
            )}
          </div>
        )}
        <div id="cMain" className={styles.main}>
          {this.props.children}
        </div>
      </main>
    );
  }
}

export default Main;
