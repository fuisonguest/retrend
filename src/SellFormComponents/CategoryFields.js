import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Heading,
  Divider,
  Box,
  Checkbox,
  Stack,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import {
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';

export default function CategoryFields({ category, onCategoryDataChange }) {
  // Car and Bike category fields
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("New");

  // Current year for dropdowns
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  useEffect(() => {
    // Create an object with the relevant data based on the category
    let categoryData = {};
    
    if (category.toLowerCase() === "cars" || category.toLowerCase() === "bikes" || 
        category.toLowerCase() === "retrend (cars)" || category.toLowerCase() === "motorcycles") {
      categoryData = {
        type: category.toLowerCase(),
        brand,
        model,
        year,
        condition
      };
    } else {
      // For other categories, provide a generic structure
      categoryData = {
        type: category.toLowerCase(),
        condition
      };
    }
    
    // Pass the data to the parent component
    onCategoryDataChange(categoryData);
  }, [category, brand, model, year, condition]);

  // Update the renderFields function to handle all categories
  const renderFields = () => {
    // For vehicle categories, show all fields
    if (category.toLowerCase() === "cars" || 
        category.toLowerCase() === "bikes" || 
        category.toLowerCase() === "retrend (cars)" || 
        category.toLowerCase() === "motorcycles") {
      return (
        <>
          <FormControl id="brand">
            <FormLabel>Brand</FormLabel>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
          </FormControl>
          <FormControl id="model">
            <FormLabel>Model</FormLabel>
            <Input value={model} onChange={(e) => setModel(e.target.value)} />
          </FormControl>
          <FormControl id="year">
            <FormLabel>Year</FormLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="condition">
            <FormLabel>Condition</FormLabel>
            <RadioGroup value={condition} onChange={setCondition}>
              <Stack direction="row">
                <Radio value="New">New</Radio>
                <Radio value="Used">Used</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </>
      );
    }
    
    // For all other categories, just show condition
    return (
      <FormControl id="condition">
        <FormLabel>Condition</FormLabel>
        <RadioGroup value={condition} onChange={setCondition}>
          <Stack direction="row">
            <Radio value="New">New</Radio>
            <Radio value="Used">Used</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <div className="mt-3 mb-3">
      <MDBCard>
        <MDBCardBody>
          <Heading size="md" mb={4}>Category Details</Heading>
          {renderFields()}
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}