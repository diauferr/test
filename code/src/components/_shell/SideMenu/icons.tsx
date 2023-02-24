/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';

export const HomeIcon = (props: any) => (
  <svg
    baseProfile="tiny"
    viewBox="0 0 24 24"
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M12 3s-6.186 5.34-9.643 8.232A1.041 1.041 0 0 0 2 12a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 .98.98 0 0 0-.383-.768C18.184 8.34 12 3 12 3z" />
  </svg>
);

export const SupportIcon = (props: any) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M256 0C148.059 0 60.234 87.824 60.234 195.766v180.703c0 24.914 20.266 45.18 45.176 45.18 24.914 0 45.18-20.266 45.18-45.18V225.883c0-24.91-20.266-45.176-45.18-45.176-5.07 0-9.867 1.027-14.426 2.574C97.41 97.77 168.887 30.117 256 30.117c87.066 0 158.523 67.59 165.008 153.043-4.531-1.55-9.356-2.453-14.418-2.453-24.914 0-45.18 20.266-45.18 45.176v150.586c0 24.914 20.266 45.18 45.18 45.18 5.305 0 10.324-1.087 15.058-2.774v17.832c0 8.309-6.765 15.059-15.058 15.059H298.402c-6.238-17.493-22.797-30.118-42.402-30.118-24.91 0-45.176 20.266-45.176 45.176C210.824 491.734 231.09 512 256 512c19.605 0 36.164-12.629 42.402-30.117H406.59c24.91 0 45.176-20.266 45.176-45.176V195.766C451.766 87.824 363.94 0 256 0zm0 0M481.883 213.598v175.156C499.37 382.52 512 365.96 512 346.352V256c0-19.605-12.629-36.164-30.117-42.402zm0 0M0 256v90.352c0 19.609 12.629 36.168 30.117 42.402V213.598C12.63 219.836 0 236.395 0 256zm0 0" />
  </svg>
);

export const AnnotationIcon = (props: any) => (
  <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
      d="M4 26l2.5-2.5"
    />
    <path d="M19 16l7.414-7.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L14 11l5 5zM10.761 24.239L17 18l-5-5-6.241 6.241a4.004 4.004 0 0 0-1.036 1.795l-.65 2.429 2.595 2.42 2.291-.608a4.01 4.01 0 0 0 1.802-1.038z" />
    <path d="M25 8l1.379-1.379a2.12 2.12 0 0 0 0-2.998l-.002-.002a2.12 2.12 0 0 0-2.998 0L22 5l3 3z" />
    <circle cx="6" cy="24" r="2" />
    <path
      d="M22 5l-1.285-1.285a2.424 2.424 0 0 0-3.429 0L17 4c-1 1-2.5 3.5-4 5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export const FolderIcon = (props: any) => (
  <svg viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
    <title />
    <desc />
    <defs />
    <g fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1" {...props}>
      <g id="Core" transform="translate(-44.000000, -256.000000)">
        <g id="folder" transform="translate(44.000000, 256.000000)">
          <path
            d="M8,0 L2,0 C0.9,0 0,0.9 0,2 L0,14 C0,15.1 0.9,16 2,16 L18,16 C19.1,16 20,15.1 20,14 L20,4 C20,2.9 19.1,2 18,2 L10,2 L8,0 L8,0 Z"
            id="Shape"
          />
        </g>
      </g>
    </g>
  </svg>
);

export const UserManagementIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.13 80.13">
    <path d="M48.355 17.922c3.705 2.323 6.303 6.254 6.776 10.817a11.69 11.69 0 0 0 4.966 1.112c6.491 0 11.752-5.261 11.752-11.751 0-6.491-5.261-11.752-11.752-11.752-6.429.002-11.644 5.169-11.742 11.574zm-7.699 24.062c6.491 0 11.752-5.262 11.752-11.752s-5.262-11.751-11.752-11.751c-6.49 0-11.754 5.262-11.754 11.752s5.264 11.751 11.754 11.751zm4.985.801h-9.972c-8.297 0-15.047 6.751-15.047 15.048v12.195l.031.191.84.263c7.918 2.474 14.797 3.299 20.459 3.299 11.059 0 17.469-3.153 17.864-3.354l.785-.397h.084V57.833c.003-8.297-6.747-15.048-15.044-15.048zm19.443-12.132h-9.895a14.483 14.483 0 0 1-4.47 10.088c7.375 2.193 12.771 9.032 12.771 17.11v3.758c9.77-.358 15.4-3.127 15.771-3.313l.785-.398h.084V45.699c0-8.296-6.75-15.046-15.046-15.046zm-45.049-.8c2.299 0 4.438-.671 6.25-1.814a14.544 14.544 0 0 1 5.467-9.276c.012-.22.033-.438.033-.66 0-6.491-5.262-11.752-11.75-11.752-6.492 0-11.752 5.261-11.752 11.752 0 6.488 5.26 11.75 11.752 11.75zm10.554 10.888a14.492 14.492 0 0 1-4.467-10.032c-.367-.027-.73-.056-1.104-.056h-9.971C6.75 30.653 0 37.403 0 45.699v12.197l.031.188.84.265c6.352 1.983 12.021 2.897 16.945 3.185v-3.683c.002-8.078 5.396-14.915 12.773-17.11z" />
  </svg>
);

export const UserGuideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <circle cx="255.984" cy="492" r="20" />
    <path d="M412.979 155.775C412.321 69.765 342.147 0 255.984 0c-86.57 0-157 70.43-157 157 0 11.046 8.954 20 20 20s20-8.954 20-20c0-64.514 52.486-117 117-117s117 52.486 117 117c0 .356.009.71.028 1.062a116.936 116.936 0 0 1-71.12 106.661c-40.038 17.094-65.908 56.675-65.908 100.839V412c0 11.046 8.954 20 20 20s20-8.954 20-20v-46.438c0-28.117 16.334-53.258 41.614-64.051a156.884 156.884 0 0 0 95.418-144.516c0-.41-.013-.816-.037-1.22z" />
  </svg>
);

export const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <circle cx="255.984" cy="492" r="20" />
    <path d="M412.979 155.775C412.321 69.765 342.147 0 255.984 0c-86.57 0-157 70.43-157 157 0 11.046 8.954 20 20 20s20-8.954 20-20c0-64.514 52.486-117 117-117s117 52.486 117 117c0 .356.009.71.028 1.062a116.936 116.936 0 0 1-71.12 106.661c-40.038 17.094-65.908 56.675-65.908 100.839V412c0 11.046 8.954 20 20 20s20-8.954 20-20v-46.438c0-28.117 16.334-53.258 41.614-64.051a156.884 156.884 0 0 0 95.418-144.516c0-.41-.013-.816-.037-1.22z" />
  </svg>
);