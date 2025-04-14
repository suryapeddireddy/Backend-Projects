import cron from "node-cron";
import Task from "../models/task.models.js";
import User from '../models/user.models.js'
import {transporter, sendEmail} from '../utils/sendEmail.js'

cron.schedule("*/1 * * * *", async () => {
  try {
    console.log("⏰ Running cron job...");
    
    const now = new Date();
    const tasks = await Task.find({
      reminder: { $lte: now },
      status: "pending",
      isReminderSent: { $ne: true },
    }).populate("createdBy");

    console.log(`🗂️ Found ${tasks.length} task(s) to remind.`);

    for (let task of tasks) {
      const user = task.createdBy; // ✅ Use populated user

      if (!user?.email) {
        console.log(`❌ No email for user: ${user?._id}`);
        continue;
      }

      await transporter.sendMail({
        to: user.email,
        subject: "Task Reminder",
        text: `Reminder: ${task.title}\n\n${task.description}`,
      });

      console.log(`📧 Email sent to ${user.email} for task "${task.title}"`);

      task.isReminderSent = true;
      await task.save();
    }

    console.log(`[${new Date().toLocaleTimeString()}] ✅ Reminder check done`);
  } catch (error) {
    console.error("🔥 Cron job error:", error.message);
  }
});
