import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import addUserCommand from './presentation/commands/addUser.js';

void(async() =>
{
    try
    {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        program.addCommand(addUserCommand);
        await program.parseAsync(process.argv);
        exit();
    }
    catch (e)
    {
        await console.log(e);
        exit();
    }
})();
