import { PrismaClient, Country, Position } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (in correct order to avoid foreign key conflicts)
  await prisma.employee.deleteMany();
  await prisma.auth.deleteMany();
  await prisma.user.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.address.deleteMany();
  await prisma.department.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Departments
  const departments = await Promise.all([
    prisma.department.create({
      data: { name: 'Engineering' },
    }),
    prisma.department.create({
      data: { name: 'Human Resources' },
    }),
    prisma.department.create({
      data: { name: 'Marketing' },
    }),
    prisma.department.create({
      data: { name: 'Sales' },
    }),
    prisma.department.create({
      data: { name: 'Finance' },
    }),
  ]);

  console.log(`✅ Created ${departments.length} departments`);

  // Create Addresses for Branches
  const branchAddresses = await Promise.all([
    prisma.address.create({
      data: {
        street: '123 Tech Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: Country.USA,
      },
    }),
    prisma.address.create({
      data: {
        street: '456 Business Ave',
        city: 'Beirut',
        state: 'Beirut',
        zipCode: '1100',
        country: Country.LEB,
      },
    }),
    prisma.address.create({
      data: {
        street: '789 Commerce Blvd',
        city: 'Dubai',
        state: 'Dubai',
        zipCode: '00000',
        country: Country.UAE,
      },
    }),
  ]);

  console.log(`✅ Created ${branchAddresses.length} branch addresses`);

  // Create Branches
  const branches = await Promise.all([
    prisma.branch.create({
      data: {
        name: 'New York HQ',
        address: {
          connect: { id: branchAddresses[0].id },
        },
        Department: {
          connect: { id: departments[0].id }, // Engineering
        },
      },
    }),
    prisma.branch.create({
      data: {
        name: 'Beirut Office',
        address: {
          connect: { id: branchAddresses[1].id },
        },
        Department: {
          connect: { id: departments[3].id }, // Sales
        },
      },
    }),
    prisma.branch.create({
      data: {
        name: 'Dubai Branch',
        address: {
          connect: { id: branchAddresses[2].id },
        },
        Department: {
          connect: { id: departments[4].id }, // Finance
        },
      },
    }),
  ]);

  console.log(`✅ Created ${branches.length} branches`);

  // Create Addresses for Employees
  const employeeAddresses = await Promise.all([
    prisma.address.create({
      data: {
        street: '10 Maple Street',
        city: 'Brooklyn',
        state: 'NY',
        zipCode: '11201',
        country: Country.USA,
      },
    }),
    prisma.address.create({
      data: {
        street: '25 Oak Avenue',
        city: 'Queens',
        state: 'NY',
        zipCode: '11375',
        country: Country.USA,
      },
    }),
    prisma.address.create({
      data: {
        street: '42 Cedar Lane',
        city: 'Jounieh',
        state: 'Mount Lebanon',
        zipCode: '2100',
        country: Country.LEB,
      },
    }),
    prisma.address.create({
      data: {
        street: '88 Palm Street',
        city: 'Ashrafieh',
        state: 'Beirut',
        zipCode: '1102',
        country: Country.LEB,
      },
    }),
    prisma.address.create({
      data: {
        street: '15 Marina Walk',
        city: 'Dubai',
        state: 'Dubai',
        zipCode: '00000',
        country: Country.UAE,
      },
    }),
  ]);

  console.log(`✅ Created ${employeeAddresses.length} employee addresses`);

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  // Create Users with Auth and Employees
  const users = [
    {
      email: 'john.doe@company.com',
      firstName: 'John',
      lastName: 'Doe',
      salary: 120000,
      position: Position.EXECUTIVE,
      departmentId: departments[0].id, // Engineering
      addressId: employeeAddresses[0].id,
      branchId: branches[0].id,
      hireDate: new Date('2020-01-15'),
    },
    {
      email: 'jane.smith@company.com',
      firstName: 'Jane',
      lastName: 'Smith',
      salary: 95000,
      position: Position.MANAGER,
      departmentId: departments[1].id, // HR
      addressId: employeeAddresses[1].id,
      branchId: branches[0].id,
      hireDate: new Date('2021-03-20'),
    },
    {
      email: 'ahmad.hassan@company.com',
      firstName: 'Ahmad',
      lastName: 'Hassan',
      salary: 75000,
      position: Position.STAFF,
      departmentId: departments[2].id, // Marketing
      addressId: employeeAddresses[2].id,
      branchId: branches[1].id,
      hireDate: new Date('2022-06-10'),
    },
    {
      email: 'maria.khalil@company.com',
      firstName: 'Maria',
      lastName: 'Khalil',
      salary: 85000,
      position: Position.STAFF,
      departmentId: departments[3].id, // Sales
      addressId: employeeAddresses[3].id,
      branchId: branches[1].id,
      hireDate: new Date('2021-11-05'),
    },
    {
      email: 'omar.abdullah@company.com',
      firstName: 'Omar',
      lastName: 'Abdullah',
      salary: 50000,
      position: Position.INTERN,
      departmentId: departments[4].id, // Finance
      addressId: employeeAddresses[4].id,
      branchId: branches[2].id,
      hireDate: new Date('2024-01-10'),
    },
    {
      email: 'sarah.johnson@company.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      salary: 110000,
      position: Position.MANAGER,
      departmentId: departments[0].id, // Engineering
      addressId: employeeAddresses[0].id,
      branchId: branches[0].id,
      hireDate: new Date('2019-08-12'),
    },
    {
      email: 'michael.brown@company.com',
      firstName: 'Michael',
      lastName: 'Brown',
      salary: 68000,
      position: Position.STAFF,
      departmentId: departments[2].id, // Marketing
      addressId: employeeAddresses[1].id,
      branchId: branches[2].id,
      hireDate: new Date('2023-02-28'),
    },
    {
      email: 'layla.mansour@company.com',
      firstName: 'Layla',
      lastName: 'Mansour',
      salary: 45000,
      position: Position.INTERN,
      departmentId: departments[3].id, // Sales
      addressId: employeeAddresses[2].id,
      branchId: branches[1].id,
      hireDate: new Date('2024-09-01'),
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        auths: {
          create: {
            password: hashedPassword,
          },
        },
        employee: {
          create: {
            salary: userData.salary,
            position: userData.position,
            hireDate: userData.hireDate,
            department: {
              connect: { id: userData.departmentId },
            },
            branch: {
              connect: { id: userData.branchId },
            },
            address: {
              connect: { id: userData.addressId },
            },
          },
        },
      },
      include: {
        employee: true,
        auths: true,
      },
    });

    console.log(`✅ Created user: ${user.email}`);
  }

  console.log('🎉 Database seeding completed successfully!');
  console.log(`
  Summary:
  - ${departments.length} departments
  - ${branches.length} branches
  - ${employeeAddresses.length + branchAddresses.length} addresses
  - ${users.length} users with authentication and employee records
  
  Default password for all users: Password123!
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
