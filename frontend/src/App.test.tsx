import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import { getUnixTime, parse } from 'date-fns';
import { uniq } from 'lodash';

const subcontractor = {
  id: '6d4aa261-df0d-49b2-a978-e364c3ea0b72',
  name: 'Beer, Kerluke and Pfeffer',
  email: 'Hazle_Kutch20@gmail.com',
  phone: '+497712203370',
  imageUrl: 'https://picsum.photos/seed/hGuVsBVN/500/500',
  workCategories: ['Insulation', 'Welding', 'Painting', 'Ironworking', 'Landscaping'],
  rating: 4,
  totalBidAmount: '€173,919.96',
  createdAt: 'January 4, 2022',
  description: 'Minus culpa quas. Ad tempore exercitationem. Velit similique ratione a inventore.',
};

test('renders a list of subcontractors', async () => {
  render(<App />);

  const subcontractorElements = await screen.findAllByTestId('subcontractor', { exact: false });
  expect(subcontractorElements.length).toBeGreaterThan(1);
});

test('renders a list without duplicates', async () => {
  render(<App />);

  const subcontractorElements = await screen.findAllByTestId('subcontractor', { exact: false });
  const subcontractorIds = subcontractorElements.map(
    (element) => element.attributes.getNamedItem('data-testid')?.value,
  );

  expect(subcontractorIds).toEqual(uniq(subcontractorIds));
});

test('renders subcontractors ordered by their creation date', async () => {
  render(<App />);

  const creationDateElements = await screen.findAllByText('On Cosuno since', { exact: false });
  const creationDates = creationDateElements.map((element) => {
    if (!element || !element.textContent) return null;
    const match = element.textContent.match(/On Cosuno since (.+)/);
    if (!match || match.length < 2) return null;
    const formattedCreationDate = match[1];

    return getUnixTime(parse(formattedCreationDate, 'MMMM d, yyyy', new Date()));
  });

  expect(creationDates).toEqual(creationDates.slice().sort());
});

test("renders a specific subcontractor's name", async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  const name = await within(subcontractorElement).findByText(subcontractor.name);
  expect(name).toBeInTheDocument();
});

test("renders a specific subcontractor's email address", async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  const email = await within(subcontractorElement).findByText(subcontractor.email);
  expect(email).toBeInTheDocument();
  expect(email).toHaveAttribute('href', `mailto:${subcontractor.email}`);
});

test("renders a specific subcontractor's phone number", async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  const phone = await within(subcontractorElement).findByText(subcontractor.phone);
  expect(phone).toBeInTheDocument();
  expect(phone).toHaveAttribute('href', `tel:${subcontractor.phone}`);
});

test("renders a specific subcontractor's image", async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  const image = await within(subcontractorElement).findByAltText(`img-${subcontractor.id}`);
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', subcontractor.imageUrl);
});

test("renders a specific subcontractor's work categories", async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  for (const workCategory of subcontractor.workCategories) {
    const workCategoryElement = await within(subcontractorElement).findByText(workCategory);
    expect(workCategoryElement).toBeInTheDocument();
  }
});

test("renders a specific subcontractor's rating", async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  const rating = await within(subcontractorElement).findByText(`${subcontractor.rating}/5`);
  expect(rating).toBeInTheDocument();
});

test('renders the total amount of bids created by a specific subcontractor', async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  const totalBidAmount = await within(subcontractorElement).findByText(
    subcontractor.totalBidAmount,
  );
  expect(totalBidAmount).toBeInTheDocument();
});

test("renders a specific subcontractor's creation date", async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  const createdAt = await within(subcontractorElement).findByText(
    `On Cosuno since ${subcontractor.createdAt}`,
  );
  expect(createdAt).toBeInTheDocument();
});

test("renders a specific subcontractor's description", async () => {
  render(<App />);

  const subcontractorElement = await screen.findByTestId(`subcontractor-${subcontractor.id}`);
  expect(subcontractorElement).toBeInTheDocument();

  const description = await within(subcontractorElement).findByText(subcontractor.description, {
    collapseWhitespace: false,
  });
  expect(description).toBeInTheDocument();
});
